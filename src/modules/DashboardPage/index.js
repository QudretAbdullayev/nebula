import styles from './DashboardPage.module.scss'
import KudosCard from '@/components/KudosCard/KudosCard'
import EmployeeCard from '@/components/EmployeeCard/EmployeeCard'
import SimilarProfiles from '@/components/SimilarProfiles/SimilarProfiles'
import PerformanceChart from '@/components/Performance/Performance'
import ScoreCard from '@/components/ScoreCard/ScoreCard'
import Comparison from '@/components/Comparison/Comparison'
import PerksCard from '@/components/PerksCard/PerksCard'

const DashboardPage = () => {
  return (
    <main className='g-container mb-20'>
      <div className={styles.row}>
        <EmployeeCard />
        <PerformanceChart /> 
        <div className={styles.row__right}>
            <KudosCard/>
            <SimilarProfiles/>
        </div>
      </div>
      <div className={styles.rowSecond}>
        <ScoreCard/>
        <Comparison/>
        <PerksCard/>
      </div>
    </main>
  )
}

export default DashboardPage
