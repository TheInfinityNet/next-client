type ActionGuardProps<T> = {
  children: React.ReactNode;
  actions: T | null | undefined;
  requiredActions: keyof T | Array<keyof T>;
  loading?: boolean;
  condition?: "ALL" | "ANY";
};

export function ActionGuard<T>({
  children,
  actions,
  requiredActions,
  loading,
  condition = "ALL",
}: ActionGuardProps<T>): React.ReactNode {
  if (loading || !actions) return null;

  const isAllowed = Array.isArray(requiredActions)
    ? condition === "ALL"
      ? requiredActions.every((action) => actions[action])
      : requiredActions.some((action) => actions[action])
    : actions[requiredActions];

  if (!isAllowed) return null;

  return <>{children}</>;
}
