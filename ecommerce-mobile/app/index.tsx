import { View, Text, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import ProductListItem from '../components/ProductListItem';
import { Button, ButtonText } from '@/components/ui/button';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });
  /*const [products, setProduct] = useState();
    
useEffect(()=>{
    const fetchProducts = async () => {
        const data = await listProducts();
        setProduct(data);
    }

    fetchProducts();
}, []);*/

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });
  if(isLoading){
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Error fetching products {error.message}</Text>
  }
  return (
    <FlatList
      key={numColumns}
      data={data}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
