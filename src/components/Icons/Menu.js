/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

 import React from 'react'
 import styled from 'styled-components'

 export default class extends React.Component {
   render () {
     return (
       <MenuIcon width='24' height='24' viewBox='0 0 24 24' className='ld-button-cross'>
         <g fill='currentColor' >
           <path d='M11 6h2v12h-2z' />
           <path d='M18 11v2H6v-2z' />
         </g>
       </MenuIcon>
     )
   }
 }

 const MenuIcon = styled.svg`
   position: absolute;
   transform: scale(0.7);
   top: 0;
   left: 0;
 `
