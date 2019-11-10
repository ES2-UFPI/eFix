import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    overflow:scroll;
`;

export const Body = styled.View`
    flex-direction: column;
    padding: 0 10px 0 10px;
    border-radius: 10px;
    border-color: #ebf0f0;
    border-width: 1px;
    background-color: #ebf0f0;
    elevation: 10px;
`;

export const Title = styled.Text`
    color: #2196f3;
    font-weight: bold;
    margin: 10px 0 10px 0;
`;

export const Service = styled.View`
    padding: 10px 0 10px 0;
`;