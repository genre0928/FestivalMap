import { useQuery } from "@tanstack/react-query";
import { testApi, type IApi } from "../api";
import Table from "../Components/Table";
import { useEffect, useState } from "react";
import RealMap from "../Components/RealMap";

function Home() {
  const { data, isLoading } = useQuery<IApi>({
    queryKey: ["api"],
    queryFn: () => testApi(),
  });
  const [fstName, setFstName] = useState<string | null>(null);
  // 데이터를 받아오고 나면 한 번만 필터 + 변환
  useEffect(() => {
    if (!data) return;

    const items = data.response.body.items;
    const today = new Date().getTime();

    const filteredItems = items.filter((item) => {
      const fstStart = new Date(item.fstvlStartDate).getTime();
      const fstEnd = new Date(item.fstvlEndDate).getTime();
      return fstStart <= today && fstEnd >= today;
    });

    const parsed = filteredItems
      .filter((item) => item.latitude && item.longitude)
      .map((item) => ({
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude),
      }));
  }, [data]);

  if (!data) return null;

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
    <div className="flex gap-10 text-spring w-full h-full">
      <div className=" basis-2/6 border border-gray-600">
        <RealMap data={filteredItems} hoveredFstName={fstName}/>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="basis-4/6">
          <Table data={data} onRowHover={setFstName}/>
        </div>
      )}
    </div>
  );
}

export default Home;
