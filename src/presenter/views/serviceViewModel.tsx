import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { ServiceView } from './viewsEntities/serviceViewEntity';
import { Service } from '../../domain/entities/Service';

export const serviceViewModel = () => {
  return (mine: boolean, type: string, step: string, category: string) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getServices = DI.resolve('getServicesUseCase')

    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['services', mine, type, step, category],
        queryFn: async ({ pageParam = 1 }) => await getServices.execute(pageParam, mine, type, step, category) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.services?.length ? pages.length + 1 : undefined
      });
    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)

    const flat = data?.pages.flat().map(page => page.services).flat()
    const services = userLoading || isLoading ? [] : flat?.map((service: Service) => new ServiceView(service, user))

    return {
      count,
      services,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    };
  }
}

export const serviceIdViewModel = () => {
  return (id: number) => {
    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getServiceById = DI.resolve('getServiceByIdUseCase')

    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['serviceById', id],
      queryFn: async () => await getServiceById.execute(id),
    })
    const service = userLoading ? {} : data ? new ServiceView(data, user) : {} as ServiceView;
    return { service, isLoading, error, refetch }
  }
}
