// single-history/[id]/page.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import history from "../../history/history.json"; 

interface HistoryItem {
  id: number;
  date: string;
  diseaseAnalysis?: {
    gingivitis?: {
      count: number;
      level: string;
    };
    cavities?: {
      count: number;
      level: string;
    };
    plaque?: string;
    gumRecession?: string;
  };
}

const SingleHistoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [historyItem, setHistoryItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    if (id) {
      const foundHistoryItem: any = history.oralScans.find(
        (item) => item.id === Number(id)
      );
      setHistoryItem(foundHistoryItem || null);
    }
  }, [id]);

  if (!historyItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{historyItem.date}</h1>
      {/* Render other details of the historyItem as needed */}
    </div>
  );
};

export default SingleHistoryPage;
