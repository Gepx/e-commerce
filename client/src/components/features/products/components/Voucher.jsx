import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Voucher = ({ vouchers }) => {
  return (
    <>
      {vouchers.length > 0 && (
        <section className="h-[120px]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Vouchers</h2>
            <span className="text-sm text-gray-500">{vouchers.length} available</span>
          </div>
          <div className="flex gap-3 overflow-x-auto h-[96px] scroll-smooth snap-x snap-mandatory">
            {vouchers.map((v) => (
              <Card
                key={v.id}
                className="min-w-[220px] h-full p-3 flex items-center justify-between">
                <div className="min-w-0 flex items-center gap-5">
                  <div>
                    <p className="font-semibold truncate">{v.title}</p>
                    <p className="text-xs text-gray-500 truncate">{v.desc}</p>
                    <p className="text-xs text-gray-500 truncate">Ends {v.endsIn}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-black text-white hover:bg-gray-700 cursor-pointer">
                    Use
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Voucher;
