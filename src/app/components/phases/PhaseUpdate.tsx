import { ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import supabase from "../../../supabaseClient";

interface PhaseRow {
  id: number | string;
  name: string;
  progress: number | null;
  tasks: number | null;
  notes: string | null;
}

interface PhaseOption {
  id: string;
  dbId: number | string;
  name: string;
  suggestedProgress: number;
  tasks: number;
  notes: string;
}

function clampProgress(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function PhaseUpdate() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPhaseId = searchParams.get("phaseId");

  const [phaseOptions, setPhaseOptions] = useState<PhaseOption[]>([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [showPhaseDropdown, setShowPhaseDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchPhases = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("phases")
        .select("id, name, progress, tasks, notes")
        .order("startDate", { ascending: true });

      if (error) {
        toast.error(`Unable to load phases: ${error.message}`);
        setPhaseOptions([]);
        setSelectedPhaseId("");
        setProgress(0);
        setNotes("");
        setIsLoading(false);
        return;
      }

      const options: PhaseOption[] = ((data ?? []) as PhaseRow[]).map((phase) => ({
        id: String(phase.id),
        dbId: phase.id,
        name: phase.name,
        suggestedProgress: clampProgress(Number(phase.progress ?? 0)),
        tasks: Number(phase.tasks ?? 0),
        notes: phase.notes ?? "",
      }));

      setPhaseOptions(options);

      const initialSelection =
        options.find((phase) => phase.id === requestedPhaseId) ?? options[0] ?? null;

      if (initialSelection) {
        setSelectedPhaseId(initialSelection.id);
        setProgress(initialSelection.suggestedProgress);
        setNotes(initialSelection.notes);
      } else {
        setSelectedPhaseId("");
        setProgress(0);
        setNotes("");
      }

      setIsLoading(false);
    };

    void fetchPhases();
  }, [requestedPhaseId]);

  const selectedPhase = useMemo(
    () => phaseOptions.find((phase) => phase.id === selectedPhaseId) ?? null,
    [phaseOptions, selectedPhaseId],
  );

  const handlePhaseSelect = (phase: PhaseOption) => {
    setSelectedPhaseId(phase.id);
    setProgress(phase.suggestedProgress);
    setNotes(phase.notes);
    setShowPhaseDropdown(false);

    const params = new URLSearchParams(searchParams);
    params.set("phaseId", phase.id);
    setSearchParams(params);
  };

  const handleSubmit = async () => {
    if (!selectedPhase || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const computedStatus = progress >= 100 ? "completed" : progress > 0 ? "in-progress" : "pending";
    const completedTasks = selectedPhase.tasks > 0 ? Math.round((progress / 100) * selectedPhase.tasks) : 0;

    const { error } = await supabase
      .from("phases")
      .update({
        progress,
        notes: notes.trim() || null,
        status: computedStatus,
        completedTasks,
      })
      .eq("id", selectedPhase.dbId);

    if (error) {
      toast.error(`Failed to update phase: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    toast.success("Phase updated successfully");
    navigate("/phases");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h1 className="font-bold text-white text-2xl mb-2">Update Progress</h1>
        <p className="text-blue-100">Track construction phase completion</p>
      </div>

      <div className="px-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Select Phase</label>
          <div className="relative">
            <button
              onClick={() => setShowPhaseDropdown(!showPhaseDropdown)}
              disabled={isLoading || phaseOptions.length === 0}
              className="w-full flex items-center justify-between px-4 py-4 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-900 hover:border-blue-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>
                {isLoading
                  ? "Loading phases..."
                  : selectedPhase?.name ?? "No phases available"}
              </span>
              <ChevronDown
                className={`text-gray-500 transition-transform ${showPhaseDropdown ? "rotate-180" : ""}`}
                size={20}
              />
            </button>

            {showPhaseDropdown && phaseOptions.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                {phaseOptions.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => handlePhaseSelect(phase)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors font-semibold text-gray-900 border-b border-gray-100 last:border-b-0"
                  >
                    {phase.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedPhase && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
            <div className="flex items-start gap-3">
              <div className="bg-orange-600 rounded-lg p-2 flex-shrink-0">
                <Sparkles className="text-white" size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-1">AI Suggestion</p>
                <p className="text-sm text-gray-700">
                  Based on recent updates, {selectedPhase.name} is approximately{" "}
                  <span className="font-bold text-orange-600">{selectedPhase.suggestedProgress}%</span> complete
                </p>
                <button
                  onClick={() => setProgress(selectedPhase.suggestedProgress)}
                  className="mt-2 px-3 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Use Suggestion
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Progress Percentage</label>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-2">
                <span className="font-bold text-blue-600 text-3xl">{progress}%</span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => setProgress(clampProgress(Number(event.target.value)))}
              disabled={!selectedPhase}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer disabled:opacity-60 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`,
              }}
            />

            <div className="flex items-center justify-between mt-2 text-sm font-semibold text-gray-600">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add any additional notes about the progress..."
            rows={4}
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-colors resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedPhase || isSubmitting}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Submit Update"}
        </button>
      </div>
    </div>
  );
}
