type ActionGuardProps<T> = {
  children: React.ReactNode;
  actions: T | null | undefined;
  requiredActions: keyof T | Array<keyof T>;
  loading?: boolean;
  condition?: "ALL" | "ANY";
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
};

export function ActionGuard<T>({
  children,
  actions,
  requiredActions,
  loading,
  condition = "ALL",
  fallback,
  loadingFallback,
}: ActionGuardProps<T>): React.ReactNode {
  if (loading || !actions) return loadingFallback || null;

  const isAllowed = Array.isArray(requiredActions)
    ? condition === "ALL"
      ? requiredActions.every((action) => actions[action])
      : requiredActions.some((action) => actions[action])
    : actions[requiredActions];

  if (!isAllowed) return fallback || null;

  return children;
}
