import React from 'react';
import styled from 'styled-components';

export const Card = styled.div`
    background-color: lightcyan;
`;

export const CardTitle = styled.div`
    pad: lightcyan;
`;

export const EventCard = styled.div`
    width: 10rem;
    height: 3rem;
    background-color: lightcyan;
`;

export const ProfileCardBody = styled.div`
    width: 10rem;
    height: 3rem;
    background-color: lightcyan;
`;

export const ProfileCard: React.FC<{ name: string; link: string } & React.HTMLProps<HTMLDivElement>> = ({
    name,
    link,
    children,
    ...props
}) => <ProfileCardBody {...props}>{children}</ProfileCardBody>;
