import Styles from './index.module.css';
const Notification = () => {
    const color = ["rgba(1, 129, 145, 0.08)", "rgba(147, 22, 2, 0.06)", "rgba(200, 142, 32, 0.06)"]
    return (
        <div>
            <div id="likedMenu" className={Styles.mainDiv}>
                <div className='p-2'>
                    <h1 className='font-semibold text-center text-sm tracking-wide my-2'>Notifications</h1>
                    <div className={Styles.singleList} style={{ backgroundColor: color[7] }} >
                        <div className='flex justify-between p-2'>
                            <div>
                                <h1 className='capitalize'>Request For Visit</h1>
                                <h2>Your request for visit has been accepted by MORES. M-associate will help you further</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notification;