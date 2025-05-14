import { useQuery } from "@tanstack/react-query";
import { testApi, type IApi } from "../api";
import Table from "../Components/Table";

function Home() {
  const { data, isLoading } = useQuery<IApi>({
    queryKey: ["api"],
    queryFn: () => testApi(),
  });
  if (!data || isLoading) return;
  const items = data.response.body.items;
  const today = new Date().getTime();
  const filteredItems = items.filter((item) => {
    const fstStart = new Date(item.fstvlStartDate).getTime();
    const fstEnd = new Date(item.fstvlEndDate).getTime();
    return fstStart <= today && fstEnd >= today;
  });

  const sortedItems = filteredItems.sort((a, b) => {
    return (
      new Date(a.fstvlStartDate).getTime() -
      new Date(b.fstvlStartDate).getTime()
    );
  });
  return (
    <div className="flex gap-2 text-spring w-full h-full">
      <div className="w-10 basis-2/5 h-100 bg-black">ㅁㄴㅇ</div>
      <div className="basis-3/5 bg-yellow-50">
        <Table data={data} />
      </div>
    </div>
  );
}

export default Home;
