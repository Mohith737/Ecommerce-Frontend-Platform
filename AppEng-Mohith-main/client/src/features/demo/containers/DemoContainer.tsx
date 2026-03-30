import { useDemoProductsQuery } from '../hooks';
import { ProductsList, DemoHeader } from '../components';

/**
 * Container component for Demo feature
 * Manages state and business logic, connects hooks to UI components
 */
export const DemoContainer = () => {
  const { data, isLoading, error, refetch } = useDemoProductsQuery();

  return (
    <>
      <DemoHeader />
      <ProductsList data={data} isLoading={isLoading} error={error} onRefetch={refetch} />
    </>
  );
};
