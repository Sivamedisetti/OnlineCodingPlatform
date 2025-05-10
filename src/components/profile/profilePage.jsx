import './ProfilePage.css';
import profileImg from '../../assets/pro.png';

export default function ProfilePage() {
  return (
    <div className="contain">
      <div className="left-card">
        <img src={profileImg} alt='profile-img'></img>
      </div>
      <div className="right-card">
        bye
      </div>
    </div>
  );
}


