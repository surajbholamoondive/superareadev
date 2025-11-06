const  overpassRequest =async (overpassQuery)=>{
    const OverpassUrl = process.env.NEXT_PUBLIC_OVERPASS_URL
   return await fetch(OverpassUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `data=${encodeURIComponent(overpassQuery)}`,
      });
}
export default overpassRequest;