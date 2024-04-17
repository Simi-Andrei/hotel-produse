import connectDB from "@/lib/database";
import Shelf from "@/models/shelf";

const getAllShelves = async () => {
  try {
    await connectDB();

    const shelves = await Shelf.find({});

    return shelves;
  } catch (error) {
    console.log;
  }
};

const SlotsMap = async () => {
  const shelves = await getAllShelves();

  return (
    <div>
      {shelves.map((shelf, shelfIndex) => (
        <div className="flex" key={shelfIndex}>
          <span>{shelf.number}</span>
          <div>
            {shelf.slots.map((slot, slotIndex) => (
              <button
                className={`${slot ? "bg-red-500" : "bg-green-500"}`}
                key={slotIndex}
              >
                {shelf.number + (slotIndex + 1)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotsMap;
