import { useState } from "react";
import { ChevronLeft, Upload, Plus, Search, Folder, FileText, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router";

interface Invoice {
  id: string;
  supplier: string;
  amount: number;
  status: "paid" | "pending";
  date: string;
  site: string;
}

export function InvoiceManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  const sites = ["Riverdale Tower", "Green Valley", "Skyline Plaza", "Metro Heights"];

  const invoices: Invoice[] = [
    { id: "INV-001", supplier: "BuildMart Supplies", amount: 125000, status: "pending", date: "2026-04-01", site: "Riverdale Tower" },
    { id: "INV-002", supplier: "GreenTech Materials", amount: 85000, status: "paid", date: "2026-03-28", site: "Riverdale Tower" },
    { id: "INV-003", supplier: "MetalWorks Inc", amount: 156000, status: "pending", date: "2026-04-03", site: "Green Valley" },
    { id: "INV-004", supplier: "ConcretePro Ltd", amount: 245000, status: "paid", date: "2026-03-25", site: "Skyline Plaza" },
    { id: "INV-005", supplier: "TimberMasters", amount: 67000, status: "pending", date: "2026-04-05", site: "Green Valley" },
    { id: "INV-006", supplier: "PaintWorld", amount: 42000, status: "paid", date: "2026-03-30", site: "Metro Heights" },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSite = !selectedSite || invoice.site === selectedSite;
    return matchesSearch && matchesSite;
  });

  const getInvoicesBySite = (site: string) => {
    return invoices.filter((inv) => inv.site === site).length;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Invoice Management</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => navigate("/invoices/upload")}
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Upload className="w-5 h-5" />
            Upload Invoice
          </button>
          <button
            onClick={() => navigate("/invoices/upload")}
            className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Generate
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoices..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Site Folders */}
      {!selectedSite && (
        <div className="p-4">
          <h2 className="font-bold text-gray-900 mb-3">Sites</h2>
          <div className="grid grid-cols-2 gap-3">
            {sites.map((site) => (
              <button
                key={site}
                onClick={() => setSelectedSite(site)}
                className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-95"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 rounded-lg p-3 mb-2">
                    <Folder className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{site}</p>
                  <p className="text-xs text-gray-600">
                    {getInvoicesBySite(site)} invoices
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Back to Sites */}
      {selectedSite && (
        <div className="px-4 pt-4">
          <button
            onClick={() => setSelectedSite(null)}
            className="text-blue-600 font-semibold text-sm flex items-center gap-1"
          >
            ← Back to Sites
          </button>
          <h2 className="font-bold text-gray-900 mt-3 mb-3">{selectedSite}</h2>
        </div>
      )}

      {/* Invoice List */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="space-y-3">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => navigate(`/invoice-detail/${invoice.id}`)}
              className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 active:scale-98 transition-transform cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-gray-100 rounded-lg p-2">
                  <FileText className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">{invoice.id}</h3>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {invoice.status === "paid" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {invoice.status === "paid" ? "Paid" : "Pending"}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{invoice.supplier}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{invoice.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{invoice.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-bold text-gray-900 mb-1">No invoices found</p>
            <p className="text-sm text-gray-600">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
