"use client"
import { useState } from "react";
import { Search, Filter, Eye, Download, CheckCircle, XCircle, Clock, FileText } from "lucide-react";

interface Application {
  id: string;
  childName: string;
  childNameArabic: string;
  gradeApplying: string;
  dateOfBirth: string;
  fatherName: string;
  fatherPhone: string;
  fatherEmail: string;
  motherName: string;
  motherPhone: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

// Mock data for demonstration
const mockApplications: Application[] = [
  {
    id: "1",
    childName: "Ahmed Ali",
    childNameArabic: "أحمد علي",
    gradeApplying: "grade1",
    dateOfBirth: "2018-05-15",
    fatherName: "Ali Mohammed",
    fatherPhone: "+968 9123 4567",
    fatherEmail: "ali@example.com",
    motherName: "Fatima Hassan",
    motherPhone: "+968 9234 5678",
    status: "pending",
    submittedAt: "2024-01-15T10:30:00"
  },
  {
    id: "2",
    childName: "Sara Abdullah",
    childNameArabic: "سارة عبدالله",
    gradeApplying: "kg2",
    dateOfBirth: "2019-08-22",
    fatherName: "Abdullah Salem",
    fatherPhone: "+968 9345 6789",
    fatherEmail: "abdullah@example.com",
    motherName: "Maryam Khalid",
    motherPhone: "+968 9456 7890",
    status: "approved",
    submittedAt: "2024-01-10T14:20:00"
  },
  {
    id: "3",
    childName: "Omar Saeed",
    childNameArabic: "عمر سعيد",
    gradeApplying: "grade2",
    dateOfBirth: "2017-03-10",
    fatherName: "Saeed Ahmed",
    fatherPhone: "+968 9567 8901",
    fatherEmail: "saeed@example.com",
    motherName: "Aisha Mohammed",
    motherPhone: "+968 9678 9012",
    status: "rejected",
    submittedAt: "2024-01-08T09:15:00"
  }
];

const gradeLabels: Record<string, string> = {
  kg1: "روضة أولى",
  kg2: "روضة ثانية",
  grade1: "الصف الأول",
  grade2: "الصف الثاني",
  grade3: "الصف الثالث",
  grade4: "الصف الرابع"
};

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
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.childNameArabic.includes(searchTerm) ||
      app.fatherName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected") => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">طلبات التسجيل</h1>
        <p className="text-gray-600">إدارة ومراجعة طلبات التسجيل المقدمة</p>
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
              <option value="all">جميع الحالات</option>
              <option value="pending">قيد المراجعة</option>
              <option value="approved">مقبول</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 font-semibold mb-1">قيد المراجعة</p>
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
                        <p className="font-semibold text-gray-900">{app.childName}</p>
                        <p className="text-sm text-gray-600">{app.childNameArabic}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {gradeLabels[app.gradeApplying]}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{app.fatherName}</p>
                        <p className="text-sm text-gray-600">{app.fatherEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-left">
                      {app.fatherPhone}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(app.submittedAt).toLocaleDateString('ar-EG')}
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
                          onClick={() => setSelectedApplication(app)}
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
                    <p className="text-sm text-gray-600">الاسم (English)</p>
                    <p className="font-semibold">{selectedApplication.childName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الاسم (العربية)</p>
                    <p className="font-semibold">{selectedApplication.childNameArabic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تاريخ الميلاد</p>
                    <p className="font-semibold">{selectedApplication.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الصف المتقدم له</p>
                    <p className="font-semibold">{gradeLabels[selectedApplication.gradeApplying]}</p>
                  </div>
                </div>
              </div>

              {/* Father Information */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">معلومات الأب</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">الاسم</p>
                    <p className="font-semibold">{selectedApplication.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الهاتف</p>
                    <p className="font-semibold">{selectedApplication.fatherPhone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                    <p className="font-semibold">{selectedApplication.fatherEmail}</p>
                  </div>
                </div>
              </div>

              {/* Mother Information */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">معلومات الأم</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">الاسم</p>
                    <p className="font-semibold">{selectedApplication.motherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الهاتف</p>
                    <p className="font-semibold">{selectedApplication.motherPhone}</p>
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
