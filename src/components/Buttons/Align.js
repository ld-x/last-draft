import React from 'react'

export class AlignLeft extends React.Component {
  render () {
    return (
      <svg height='24' viewBox='0 0 24 24' width='24' className='ld-button-align-left'>
        <path d='M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z' fill='currentColor' />
      </svg>
    )
  }
}

export class AlignCenter extends React.Component {
  render () {
    return (
      <svg height='24' viewBox='0 0 24 24' width='24' className='ld-button-align-center'>
        <path d='M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z' fill='currentColor' />
      </svg>
    )
  }
}

export class AlignRight extends React.Component {
  render () {
    return (
      <svg height='24' viewBox='0 0 24 24' width='24' className='ld-button-align-right'>
        <path d='M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z' fill='currentColor' />
      </svg>
    )
  }
}
