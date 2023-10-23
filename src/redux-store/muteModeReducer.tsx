export const muteModeReducer = (state: boolean = true, action: any) => {
   switch (action.type) {
      case 'MUTE_MODE_ON':
         return true;

      case 'MUTE_MODE_OFF':
         return false;
            
      default:
         return state;
   }
}