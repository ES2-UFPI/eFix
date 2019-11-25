import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    overflow:scroll;
`;

export const Body = styled.View`
    flex-direction: column;
    padding: 5px;
    margin: 5px 8px;
`;

export const Title = styled.Text`
    color: #2196f3;
    font-weight: bold;
    margin: 0 0 10px 0;
`;

export const ButtonContainer = styled.View`
    align-items: center;
    padding: 10px;
    flex-direction: row;
    justify-content: space-around;
`;