import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFoundPage() {
  return <div className="flex min-h-screen items-center justify-center bg-[#f3f2ef] px-4">
  <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-md">
    <h1 className="text-6xl font-bold text-[#0a66c2]">404</h1>

    <p className="mt-4 text-lg font-semibold text-gray-900">
      This page doesn’t exist
    </p>

    <p className="mt-2 text-sm text-gray-600">
      The link might be broken or the page has been removed.
    </p>

    <NavLink
      to={'/'}
      className="mt-6 inline-block rounded-md bg-[#0a66c2] px-6 py-2 text-sm font-medium text-white hover:bg-[#004182]"
    >
      Back to Feed
    </NavLink>
  </div>
</div>

}
