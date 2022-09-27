import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit';

function LoadingPage() {
  return (
    <LoadingPageContainer>
        <LoadingPageContents>
            <img alt='' src='https://imgs.search.brave.com/SX2wtKTOrQEgK-kXOglPA6eHsVl9vjkGLAEPTMo3jbk/rs:fit:525:525:1/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vc3RhcnR1cC1n/cmluZC9pbWFnZS91/cGxvYWQvY19maWxs/LGRwcl8zLGZfYXV0/byxnX2NlbnRlcixo/XzE3NSxxX2F1dG86/Z29vZCx3XzE3NS92/MS9nY3MvcGxhdGZv/cm0tZGF0YS1zbGFj/ay9ldmVudHMvc2xh/Y2stbG9nby10aHVt/Yi5wbmc'/>
            <Spinner
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn='none'
            />
        </LoadingPageContents>
    </LoadingPageContainer>
  )
}

export default LoadingPage


const LoadingPageContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;


const LoadingPageContents  = styled.div`

    text-align: center;
    padding: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img { 
        height: 100px;
        padding: 20px;
        margin-bottom: 40px;
    }
`;

