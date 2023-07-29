import homepageIllustration from '../../Assets/homepage-illustration.svg'
import layeredWave from '../../Assets/layered-wave.svg'

const HomePage = () => {
    return <div>
        <div className="bg-primary relative h-[80vh] sm:h-[90vh] xl:h-96 lg:h-80 md:h-72 flex justify-center">
            <div className="flex flex-col md:flex-row absolute w-full 2xl:container px-7">
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mt-6 md:mt-20 lg:mt-24 xl:mt-36 order-2 md:order-1">
                    <h1 className="text-white font-semibold text-3xl md:text-left font-nunito tracking-wide">Welcome to Eurytus Coding!</h1>
                    <h1 className="text-white text-xl font-nunito text-left mt-4 xl:w-1/2">
                        Improve your coding skills, share your knowledge,
                        test your students and compete with your
                        friends. All in one platform!
                    </h1>
                    <button className="text-white w-56 h-12 bg-secondary shadow mt-8 rounded font-nunito text-lg font-semibold">JOIN NOW!</button>
                </div>
                <div className="w-full md:w-1/2 flex justify-end mt-4 md:mt-12 lg:mt-6 xl:mt-8 order-1 md:order-2">
                    <img className='w-6/6 md:w-6/6 h-6/6 md:h-5/6 lg:w-5/6 xl:w-9/12 2xl:w-4/6' src={homepageIllustration} alt="coding illustration" />
                </div>
            </div>
        </div>
        
        <img style={{width: '100%',height: '650px'}} src={layeredWave} alt="waves" />
        
    </div>
}

export default HomePage;