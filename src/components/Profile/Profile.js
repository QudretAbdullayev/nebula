import SafeImage from '../SafeImage/SafeImage';
import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div>
        <SafeImage src="/profile.jpg" alt="Profile Image" />
      </div>
    </div>
  )
}

export default Profile
