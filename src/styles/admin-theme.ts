/**
 * Admin Theme Constants
 * Consistent styling across all admin pages
 */

export const adminTheme = {
  // Card backgrounds
  card: {
    primary: "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700",
    hover: "hover:border-purple-500 transition-all",
  },

  // Table styles
  table: {
    header: "bg-slate-700/50 border-b border-slate-600",
    headerCell: "px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider",
    row: "hover:bg-slate-700/30 transition-colors",
    cell: "px-6 py-4",
    divider: "divide-y divide-slate-700",
  },

  // Buttons
  button: {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all",
    danger: "bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all",
    icon: "p-2 hover:bg-slate-700 rounded-lg transition-colors",
  },

  // Status badges
  badge: {
    success: "bg-green-500/10 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    danger: "bg-red-500/10 text-red-400 border border-red-500/30",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    default: "bg-slate-500/10 text-slate-400 border border-slate-500/30",
  },

  // Form inputs
  input: {
    base: "w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500",
    error: "border-red-500",
    disabled: "opacity-50 cursor-not-allowed",
  },

  // Stats cards
  stats: {
    card: "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4",
    iconBox: {
      purple: "p-3 bg-purple-500/10 rounded-lg",
      blue: "p-3 bg-blue-500/10 rounded-lg",
      green: "p-3 bg-green-500/10 rounded-lg",
      red: "p-3 bg-red-500/10 rounded-lg",
      yellow: "p-3 bg-yellow-500/10 rounded-lg",
    },
  },

  // Modal
  modal: {
    overlay: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
    content: "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg w-full",
  },

  // Text colors
  text: {
    primary: "text-white",
    secondary: "text-gray-400",
    success: "text-green-400",
    warning: "text-yellow-400",
    danger: "text-red-400",
    info: "text-blue-400",
    purple: "text-purple-400",
  },

  // Loading & Empty states
  state: {
    loading: "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-12 flex flex-col items-center justify-center",
    error: "bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/50 rounded-lg p-6",
    empty: "px-6 py-12 text-center text-gray-400",
  },
};

// Helper function to combine classes
export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(" ");
};
