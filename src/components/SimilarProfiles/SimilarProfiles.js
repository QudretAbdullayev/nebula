import Image from 'next/image';
import styles from './SimilarProfiles.module.scss';
import Plus from '@/assets/icons/Plus';

const SimilarProfiles = () => {
  const avatars = [
    '/Dashboard/avatar-1.jpg',
    '/Dashboard/avatar-2.jpg',
    '/Dashboard/avatar-3.jpg',
    '/Dashboard/avatar-4.jpg'
  ];

  return (
    <div className={styles.similar}>
      <h2 className={styles.similar__title}>Similar Profiles to Me</h2>
      <div className={styles.similar__avatars}>
        {avatars.map((avatar, index) => (
          <div key={index} className={styles.similar__avatar}>
            <Image
              src={avatar}
              alt={`Similar profile ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}

        <div className={styles.similar__more}>
          <div className={styles.similar__more__icon}>
            <Plus/>
          </div>
          <span className={styles.similar__more__text}>2</span>
        </div>
      </div>

      <p className={styles.similar__description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
      </p>
    </div>
  );
};

export default SimilarProfiles;