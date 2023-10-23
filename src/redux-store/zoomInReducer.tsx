export const zoomInReducer = (state: boolean = false, action: any) => {
   switch (action.type) {
      case 'ZOOM_IN':
         return !state;
            
      default:
         return state;
   }
}