


const userLogo = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg";
const mapIcon = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg";
const bannerBg = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg";
const defaultAvatar = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg";

function CustomCard({ image, title }) {
  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      <h3>{title}</h3>
    </div>
  );
}

function TestComponent() {
  const users = [
    { id: 1, name: "Alice", img: userLogo },
    { id: 2, name: "Bob", img: mapIcon },
  ];

  const getProfileImg = (isAdmin) => (isAdmin ? userLogo : defaultAvatar);

  return (
    <div className="test-wrapper" style={{ backgroundImage: `url("https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg")` }}>
      {/* ✅ 1. Direct img tags */}
      <img src="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" alt="User" />
      <img src="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" alt="Map" />

      {/* ✅ 2. Inline background images */}
      <div style={{ backgroundImage: `url("https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg")` }} />
      <div style={{ backgroundImage: `url("./assets/banner.png")` }} />

      {/* ✅ 3. Custom components */}
      <img src="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" alt="Banner" />
      <Avatar src="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" size="lg" />
      <ProfilePicture image="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" />
      <CustomCard image="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" title="Custom" />

      {/* ✅ 4. In arrays or maps */}
      <div className="users">
        {users.map((u) => (
          <div key={u.id} className="user-item">
            <img src={u.img} alt={u.name} />
            <span>{u.name}</span>
          </div>
        ))}
      </div>

      {/* ✅ 5. Conditional rendering */}
      {true ? <img src="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" /> : <img src="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" />}
      {false && <img src="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" />}

      {/* ✅ 6. Function call */}
      <div className="profile">
        <img src={getProfileImg(true)} alt="Dynamic" />
      </div>

      {/* ✅ 7. Props spreading */}
      <Gallery {...{ src: "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg", title: "Gallery Image" }} />

      {/* ✅ 8. Nested object reference */}
      <div>
        <SomeComponent
          data={{
            name: "Nested",
            image: "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg",
          }}
        />
      </div>

      {/* ✅ 9. Template literal combining path */}
      <div style={{ backgroundImage: `url(${userLogo}?size=large)` }} />

      {/* ✅ 10. Custom prop names */}
      <HeroSection heroBg={bannerBg} heroLogo="https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg" />

      {/* ✅ 11. Dynamic import (should NOT be replaced, for safety) */}
      {import("https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244224/assets/homepageimg.jpg").then((mod) => console.log(mod))}
    </div>
  );
}

export default TestComponent;
