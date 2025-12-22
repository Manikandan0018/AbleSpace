type Props = {
  statusFilter: string;
  priorityFilter: string;
  sortOrder: string;
  setStatusFilter: (v: string) => void;
  setPriorityFilter: (v: string) => void;
  setSortOrder: (v: string) => void;
};

export default function TaskFilterSidebar({
  statusFilter,
  priorityFilter,
  sortOrder,
  setStatusFilter,
  setPriorityFilter,
  setSortOrder,
}: Props) {
  return (
    <aside
      className="
        w-full lg:w-64
        shrink-0
        rounded-2xl
        border border-white/30
        bg-white/80 backdrop-blur-xl
        shadow
        p-5
      "
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Filters</h3>

      {/* Status */}
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Priority
        </label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Sort by due date
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Low</option>
          <option value="desc">High</option>
        </select>
      </div>
    </aside>
  );
}
