import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 7px;
    justify-content: center;
    background-color: #ebf0f0;
    border-radius: 5px;
    border-color: lightgrey;
    border-width: 1px;
    overflow: hidden;
`;

export const Top = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-color: grey;
`;

export const Name = styled.Text`
    font-size: 18px;
`;

export const Title = styled.Text`
    font-size: 10px;
    color: grey;
`;

export const Text = styled.Text`
`;