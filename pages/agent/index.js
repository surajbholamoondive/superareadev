import AgentMenuConfig from '@/content/Agent/AgentSideDashboard'
import useWindowWidth from '@/context/useWindowWidth'
import SideDashboard from '@/components/SideDashboard/SideDashboard'

const Agent = () => {
  const windowWidth = useWindowWidth()
  return (
    <div>
      {windowWidth > 1024 && (
        <div className="w-[300px] m-5 max-lg:hidden ">
          <SideDashboard arrayMenu={AgentMenuConfig} />
        </div>
      )}
    </div>
  )
}
export default Agent
