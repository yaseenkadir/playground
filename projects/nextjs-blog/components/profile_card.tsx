import * as React from "react";
import {PROFILE} from "./layout";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'


export default function ProfileCard({home}: {home?: boolean}) {
  return (
      <div
          className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
             src="/images/profile.jpg" alt="Man's Face"/>
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            {!home ? (
              <Link href="/">
                <a className={"text-lg font-semibold " + utilStyles.colorInherit}>
                  {PROFILE.name}
                </a>
              </Link>
            ) : (
                <p className="text-lg text-black font-semibold">
                  {PROFILE.name}
                </p>
            )}
            <p className="text-gray-500 font-medium">
              {PROFILE.title}
            </p>
          </div>
        </div>
      </div>
  )
}

