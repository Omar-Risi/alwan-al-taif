"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Search, Filter, Eye, Download, CheckCircle, XCircle, Clock, FileText } from "lucide-react";

interface Application {
  id: string;
  student_name: string;
  father_name: string;
  class_applying: string;
  date_of_birth: string;
  parent_name: string;
  mobile_number: string;
  job: string;
  mother_name: string;
  mother_mobile_number: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}



const statusLabels: Record<string, string> = {
  pending: "قيد المراجعة",
  approved: "مقبول",
  rejected: "مرفوض"
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

const statusIcons: Record<string, any> = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle
};

export default function ApplicationsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [filterStatus, searchTerm]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admissions?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data.admissions || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parent_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mother_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setApplications(applications.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        ));
      } else {
        alert('فشل تحديث الحالة');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{t('admissionsManagement')}</h1>
        <p className="text-gray-600">{t('admissionsSubtitle')}</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث عن طالب أو ولي أمر..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">{t('allStatuses')}</option>
              <option value="pending">{t('pendingApplications')}</option>
              <option value="approved">{t('approvedApplications')}</option>
              <option value="rejected">{t('rejectedApplications')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 font-semibold mb-1">{t('pendingApplications')}</p>
              <p className="text-3xl font-bold text-yellow-900">
                {applications.filter(a => a.status === "pending").length}
              </p>
            </div>
            <Clock className="w-12 h-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 font-semibold mb-1">مقبول</p>
              <p className="text-3xl font-bold text-green-900">
                {applications.filter(a => a.status === "approved").length}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border-r-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 font-semibold mb-1">مرفوض</p>
              <p className="text-3xl font-bold text-red-900">
                {applications.filter(a => a.status === "rejected").length}
              </p>
            </div>
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/10">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-primary">اسم الطالب</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-primary">الصف</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-primary">ولي الأمر</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-primary">رقم الهاتف</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-primary">تاريخ التقديم</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-primary">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-primary">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => {
                const StatusIcon = statusIcons[app.status];
                return (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{app.student_name}</p>
                        <p className="text-sm text-gray-600">{app.class_applying}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {app.class_applying}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{app.parent_name}</p>
                        <p className="text-sm text-gray-600">{app.mobile_number}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-left">
                      {app.mobile_number}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(app.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[app.status]}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusLabels[app.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/dashboard/applications/${app.id}`)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="عرض التفاصيل"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="تحميل المستندات"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(app.id, "approved")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="قبول"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(app.id, "rejected")}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="رفض"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد طلبات مطابقة للبحث</p>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">تفاصيل الطلب</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Child Information */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">معلومات الطالب</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">اسم الطالب</p>
                    <p className="font-semibold">{selectedApplication.student_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">اسم الأب</p>
                    <p className="font-semibold">{selectedApplication.father_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تاريخ الميلاد</p>
                    <p className="font-semibold">{selectedApplication.date_of_birth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الصف المتقدم له</p>
                    <p className="font-semibold">{selectedApplication.class_applying}</p>
                  </div>
                </div>
              </div>

              {/* Father Information */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">معلومات الأب</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">الاسم</p>
                    <p className="font-semibold">{selectedApplication.parent_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الهاتف</p>
                    <p className="font-semibold">{selectedApplication.mobile_number}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">المهنة</p>
                    <p className="font-semibold">{selectedApplication.job}</p>
                  </div>
                </div>
              </div>

              {/* Mother Information */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">معلومات الأم</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">الاسم</p>
                    <p className="font-semibold">{selectedApplication.mother_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الهاتف</p>
                    <p className="font-semibold">{selectedApplication.mother_mobile_number}</p>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-2">الحالة الحالية</p>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${statusColors[selectedApplication.status]}`}>
                    {statusLabels[selectedApplication.status]}
                  </span>
                </div>
                {selectedApplication.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleStatusChange(selectedApplication.id, "approved");
                        setSelectedApplication(null);
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      قبول الطلب
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedApplication.id, "rejected");
                        setSelectedApplication(null);
                      }}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      رفض الطلب
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
