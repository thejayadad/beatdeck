

## SETUP
- update pacakge.json
```
"packageManager": "npm@10.5.2",
  "overrides": {
    "react": "$react",
    "react-dom": "$react-dom",
    "next": "$next"
  },
```

- global.css update
- home update

- run the app
- site name
- favicon
- run the website


## LAYOUT
- components folder
- sidebar
- header
- grouping setup
- add the page.tsx & layout
- add to the layout:
```
    className=' h-full flex'

```
- add the sidebar to the layout
- the logo
- install 
npm i lucide-react
- bring in the sidebar

--- STYLE NAV LINKS ---
- lib 
- cn helper
- items.ts file - put in components
- sidebar item.tsx
- sidebarnav
- bring it in to the sidebar

--- TOP HEADER ---
- creae the component folder/file
- bring into the layout

```

import React from 'react'
import SideBar from '@/_components/sidebar/side-bar';
import TopHeader from '@/_components/header/top-header';
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=' h-full flex'>
        <SideBar />
      <div className="flex-1 min-w-0 flex flex-col">
          <TopHeader />
          <main>
            {children}
         </main>
        </div>
    </div>
  )
}

export default layout
```
- backforward btn's in sepearate component
- do the mobile nav next
- walk thru step by step
- add auth icon to have something on screen


### DATABASE & AUTHENICATION SETUP
- npm i -D prisma
- npm i @prisma/client
- npx prisma init
- npm i @vercel/blob


- add vercel storage and blob
- authjs docs

- follow setup and update prisma/postgresql

- bring in auth
- lib/user-auth
- add in the auth
- signin/signout btn
- auth-action update
- update the next.config.ts
- confirm it works and check prisma studio


--- SETUP MOBILE NAV ---
- brng into the top header
- test it out - make sure its functional

