/**
 * Presentational component for Demo page header
 */
export const DemoHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        <span className="text-primary">Demo</span> Page
      </h1>
      <p className="text-text-secondary text-lg">
        Simple feature demonstrating clean architecture with hooks, containers, and UI
      </p>
    </div>
  );
};
