import ReactDOM from 'react-dom';
import React, { useCallback, useEffect } from 'react';
import { FramerMotion } from '../../helpers/framer-motion';
import Symbols from '../../images/svg/Symbols';

import {
  CloseButton,
  ContentWrapper,
  StyledSvgUser,
  StyledWrapper,
} from './Modal.styled';

const Modal = ({ children, closeModal }) => {
  const rootModal = document.querySelector('#modal');

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal, handleKeyDown]);

  const handleBackDrop = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      closeModal();
    }
  };

  // Check if rootModal exists
  if (!rootModal) return null;

  return ReactDOM.createPortal(
    <StyledWrapper onClick={handleBackDrop}>
      <FramerMotion $variant="modal">
        <ContentWrapper>
          <CloseButton onClick={closeModal}>
            <Symbols />
            <StyledSvgUser width={24} height={24}>
              <use xlinkHref="#icon-close" />
            </StyledSvgUser>
          </CloseButton>
          {children}
        </ContentWrapper>
      </FramerMotion>
    </StyledWrapper>,
    rootModal
  );
};

export default Modal;
