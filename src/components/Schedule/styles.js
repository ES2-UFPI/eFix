import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    border-width: 1px;
    background-color: #ebf0f0;
    border-color: #ebf0f0;
    border-radius: 5px;
    elevation: 10px;
    margin: 5px 0;
`;

export const Item = styled.View`
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
    flex: 1;
`;

export const Title = styled.Text`
    color: #2196f3;
    font-weight: bold;
    fontSize: 11px;
`;

export const IconView = styled.View`
    margin: 0 5px;
`;