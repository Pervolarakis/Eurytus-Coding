import homepageIllustration from '../../Assets/homepage-illustration.svg'
import layeredWave from '../../Assets/layered-wave.svg'

const HomePage = () => {
    return <div>
        <div className="bg-primary relative h-screen xl:h-96 lg:h-80 md:h-72 flex justify-center">
            <div className="flex flex-col md:flex-row absolute w-full 2xl:container px-7">
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:mt-12 lg:mt-24 xl:mt-36">
                    <h1 className="text-white font-semibold text-3xl md:text-left">Welcome to Eurytus Coding!</h1>
                    <h1 className="text-white text-xl text-left mt-4 xl:w-1/2">
                        Improve your coding skills, share your knowledge,
                        test your students and compete with your
                        friends. All in one platform!
                    </h1>
                    <button className="text-white w-56 h-12 bg-secondary shadow mt-8 rounded">JOIN NOW!</button>
                </div>
                <div className="w-full md:w-1/2 flex justify-end md:mt-12 lg:mt-6 xl:mt-8">
                    <img className='w-5/6 md:w-6/6 h-5/6 lg:w-5/6 xl:w-9/12 2xl:w-4/6' src={homepageIllustration} alt="code brackets" />
                </div>
            </div>
        </div>
        
        <img style={{width: '100%',height: '650px'}} src={layeredWave} alt="code brackets" />
        
    </div>
}

export default HomePage;