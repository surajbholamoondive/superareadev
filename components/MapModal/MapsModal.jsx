import dynamic from "next/dynamic";
import close from "../../assets/userDashboard/close.svg";
import Image from "next/image";
const OsmMapWithoutNearbyToggleTray = dynamic(
  () => import("@/components/OsmMapCard/OsmMapWithoutNearbyToggleTray"),
  { ssr: false }
);

export default function ({ property, nearby, localityLng, localityLat,setModalOpen }) {
  return (
    <div className="mt-3 fixed inset-0 h-full w-full z-[999999] bg-mapsOverlayBackground ">
      <div className="absolute top-1 right-10 z-[999999]">
        <Image
          src={close}
          width={30}
          height={30}
          className="rounded-full p-2 border border-gray-400 cursor-pointer "
          onClick={()=>setModalOpen(false)}
        />
      </div>

      <div className="w-[95%] h-[90%] mx-auto mt-8">
        <OsmMapWithoutNearbyToggleTray
          property={property}
          localityLat={localityLat}
          localityLng={localityLng}
          nearby={nearby}
        />
      </div>
    </div>
  );
}
