import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-gridy-sprites';
import { UserContext } from '../../Contexts/UserContext';


const navigation = [
    { name: 'Practice', href: '#', current: true },
    { name: 'Create Exam', href: '#', current: false },
    { name: 'Join Exam', href: '#', current: false },
  ]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }


const NavBar = () => {
    
    const {user, setUser} = useContext(UserContext);
    const [userImage, setUserImage] = useState('')

    useEffect(()=>{
      let svg = createAvatar(style, {
        seed: user?.id,
        // ... and other options
      });

      var svg64 = btoa(unescape(encodeURIComponent(svg)));
      var image64 = "data:image/svg+xml;base64," + svg64;
      setUserImage(image64);
    },[user])
    
    // console.log(image64)

    return(
        <Disclosure as="nav" className="bg-primary">
        {({ open }) => (
          <>
            <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-20">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start h-full">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-12 w-auto mr-8"
                      src="logo.png"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-12 w-auto mr-8"
                      src="logo.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4 h-full">
                      {navigation.map((item) => (
                        <div className={classNames(
                            item.current ? 'border-b-4 border-secondary' : '',
                            'flex flex-wrap content-center h-full'
                          )} key={item.name}>
                        <a
                          
                          href={item.href}
                          className={classNames(
                            item.current ? ' text-white font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white font-bold',
                            'text-md font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                          
                        </a>
                        
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {(user)?
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div className="flex flex-wrap flex-column">
                    <p className='text-white font-bold mr-4'>{user.email}</p>
                    <Menu.Button className="bg-sky-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userImage}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>:null}
                
              </div>
            </div>
  
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'border-b-4 border-secondary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}

export default NavBar;