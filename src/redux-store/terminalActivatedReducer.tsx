export const terminalActivatedReducer = (state: boolean = false, action: any) => {
   switch (action.type) {
      case 'TERMINAL_ACTIVATED':
         return !state;
   
      default:
         return state;
   }
}