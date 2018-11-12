const socket = ( namespace ) => {
  return io( namespace )
}


export { socket }
