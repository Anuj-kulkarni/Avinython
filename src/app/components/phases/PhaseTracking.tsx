import { AlertCircle, CheckCircle, ChevronRight, Clock, TrendingDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import supabase from "../../../supabaseClient";
import { toast } from "sonner";

type PhaseStatus = "completed" | "in-progress" | "pending";

interface PhaseRow {
  id: number | string;
  name: string;
  progress: number | null;
  status: string | null;
  budget: number | null;
  spent: number | null;
  startDate: string | null;
  endDate: string | null;
  tasks: number | null;
  completedTasks: number | null;
  notes: string | null;
}

interface Phase {
  id: string;
  dbId: number | string;
  name: string;
  progress: number;
  status: PhaseStatus;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  tasks: number;
  completedTasks: number;
  notes: string | null;
}

interface AIRecommendation {
  phase: string;
  suggestion: string;
  savings: number;
  impact: "high" | "medium" | "low";
}

const RUPEE = "\u20B9";

const aiRecommendations: AIRecommendation[] = [
  {
    phase: "Structure",
    suggestion: "Switch to local supplier for rebar - save INR 85,000",
    savings: 85000,
    impact: "high",
  },
  {
    phase: "Finishing",
    suggestion: "Bulk purchase tiles early - 12% discount available",
    savings: 45000,
    impact: "medium",
  },
  {
    phase: "Structure",
    suggestion: "Optimize concrete delivery schedule - reduce waste by 8%",
    savings: 32000,
    impact: "medium",
  },
];

function normalizeStatus(value: string | null): PhaseStatus {
  if (value === "completed" || value === "in-progress" || value === "pending") {
    return value;
  }

  return "pending";
}

function normalizePhases(data: PhaseRow[]): Phase[] {
  return data.map((phase) => ({
    id: String(phase.id),
    dbId: phase.id,
    name: phase.name ?? "Unnamed Phase",
    progress: Math.max(0, Math.min(100, Number(phase.progress ?? 0))),
    status: normalizeStatus(phase.status),
    budget: Number(phase.budget ?? 0),
    spent: Number(phase.spent ?? 0),
    startDate: phase.startDate ?? "-",
    endDate: phase.endDate ?? "-",
    tasks: Number(phase.tasks ?? 0),
    completedTasks: Number(phase.completedTasks ?? 0),
    notes: phase.notes,
  }));
}

export function PhaseTracking() {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhases = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase
        .from("phases")
        .select("id, name, progress, status, budget, spent, startDate, endDate, tasks, completedTasks, notes")
        .order("startDate", { ascending: true });

      if (error) {
        setErrorMessage(error.message);
        setPhases([]);
        setIsLoading(false);
        return;
      }

      setPhases(normalizePhases((data ?? []) as PhaseRow[]));
      setIsLoading(false);
    };

    void fetchPhases();
  }, []);

  const totalBudget = useMemo(() => phases.reduce((sum, phase) => sum + phase.budget, 0), [phases]);
  const totalSpent = useMemo(() => phases.reduce((sum, phase) => sum + phase.spent, 0), [phases]);
  const totalSavings = useMemo(
    () => aiRecommendations.reduce((sum, recommendation) => sum + recommendation.savings, 0),
    [],
  );
  const utilizedPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const remainingBudget = Math.max(totalBudget - totalSpent, 0);

  const handleApplyRecommendation = (recommendation: AIRecommendation) => {
    toast.success(`Applied recommendation for ${recommendation.phase}`);
  };

  const handleRecommendationDetails = (recommendation: AIRecommendation) => {
    toast.info(recommendation.suggestion);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="font-bold text-gray-900">Phase Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor construction progress</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Total Budget</span>
            <span className="font-bold text-gray-900">
              {RUPEE}
              {(totalBudget / 100000).toFixed(1)}L
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Spent</span>
            <span className="font-bold text-blue-600">
              {RUPEE}
              {(totalSpent / 100000).toFixed(1)}L
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(utilizedPercentage, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{utilizedPercentage.toFixed(1)}% utilized</span>
            <span className="text-green-600 font-semibold">
              {RUPEE}
              {(remainingBudget / 100000).toFixed(1)}L remaining
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-3">
        <h2 className="font-bold text-gray-900 mb-3">Construction Phases</h2>
        {isLoading && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-sm text-gray-600">
            Loading phases...
          </div>
        )}
        {!isLoading && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            Unable to load phases: {errorMessage}
          </div>
        )}
        {!isLoading && !errorMessage && phases.length === 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-sm text-gray-600">
            No phases found in database.
          </div>
        )}
        {!isLoading &&
          !errorMessage &&
          phases.map((phase) => (
            <Link
              key={phase.id}
              to={`/phase-update?phaseId=${encodeURIComponent(phase.id)}`}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-blue-300 transition-all active:scale-[0.98]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{phase.name}</h3>
                    {phase.status === "completed" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <CheckCircle size={12} />
                        Completed
                      </span>
                    )}
                    {phase.status === "in-progress" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        <Clock size={12} />
                        In Progress
                      </span>
                    )}
                    {phase.status === "pending" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {phase.startDate} - {phase.endDate}
                  </p>
                </div>
                <ChevronRight className="text-gray-400 flex-shrink-0 mt-1" size={20} />
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs font-bold text-gray-900">{phase.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      phase.status === "completed"
                        ? "bg-green-500"
                        : phase.status === "in-progress"
                          ? "bg-blue-600"
                          : "bg-gray-400"
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs text-gray-600 mb-0.5">Budget</p>
                  <p className="font-bold text-gray-900">
                    {RUPEE}
                    {(phase.budget / 100000).toFixed(1)}L
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <p className="text-xs text-gray-600 mb-0.5">Spent</p>
                  <p className="font-bold text-blue-600">
                    {RUPEE}
                    {(phase.spent / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-600">Tasks</span>
                <span className="text-xs font-semibold text-gray-900">
                  {phase.completedTasks}/{phase.tasks} completed
                </span>
              </div>

              {phase.spent > phase.budget * 0.9 && phase.status !== "completed" && (
                <div className="mt-3 flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-2.5">
                  <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={14} />
                  <p className="text-xs text-orange-700">
                    Approaching budget limit -{" "}
                    {phase.budget > 0 ? ((phase.spent / phase.budget) * 100).toFixed(0) : "0"}% utilized
                  </p>
                </div>
              )}
            </Link>
          ))}
      </div>

      <div className="px-4 pb-4">
        <h2 className="font-bold text-gray-900 mb-3">Cost Breakdown</h2>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="space-y-3">
            {phases.map((phase) => {
              const percentage = totalBudget > 0 ? (phase.budget / totalBudget) * 100 : 0;
              return (
                <div key={phase.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{phase.name}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {RUPEE}
                      {(phase.budget / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-blue-600 h-8 rounded-full transition-all duration-300 flex items-center justify-end pr-3"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    >
                      <span className="text-xs font-semibold text-white">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
            <span className="font-bold text-gray-900">Total Budget</span>
            <span className="font-bold text-blue-600">
              {RUPEE}
              {(totalBudget / 100000).toFixed(1)}L
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">AI Cost Optimization</h2>
          <div className="flex items-center gap-1 text-orange-600">
            <TrendingDown size={16} />
            <span className="text-sm font-bold">
              {RUPEE}
              {(totalSavings / 1000).toFixed(0)}K
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 shadow-sm border border-orange-200 mb-3">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-orange-600 rounded-full p-2">
              <TrendingDown className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Potential Savings</h3>
              <p className="text-sm text-gray-700">
                AI identified {RUPEE}
                {(totalSavings / 1000).toFixed(0)}K in cost optimization opportunities
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {aiRecommendations.map((recommendation, index) => (
            <div key={index} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-full p-1.5 ${
                    recommendation.impact === "high"
                      ? "bg-red-100"
                      : recommendation.impact === "medium"
                        ? "bg-yellow-100"
                        : "bg-blue-100"
                  }`}
                >
                  <TrendingDown
                    size={14}
                    className={
                      recommendation.impact === "high"
                        ? "text-red-600"
                        : recommendation.impact === "medium"
                          ? "text-yellow-600"
                          : "text-blue-600"
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase">{recommendation.phase}</span>
                    <span className="text-xs font-bold text-green-600">
                      -{RUPEE}
                      {(recommendation.savings / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{recommendation.suggestion}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleApplyRecommendation(recommendation)}
                      className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => handleRecommendationDetails(recommendation)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
