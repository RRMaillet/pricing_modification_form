import { useDispatch } from 'react-redux'
import { setRoles, setCurrentUser, setAuthToken } from '../store/user/user.actions'
import { useMsal } from '@azure/msal-react';
import ProfileContent from './profileContent.utils';

function StateUser() {
    const { accounts } = useMsal();
    
    const dispatch = useDispatch();
    dispatch(setRoles(accounts[0].idTokenClaims.roles))
    dispatch(setCurrentUser(accounts[0].username))
    dispatch(setAuthToken(ProfileContent()))

    }

export default StateUser;