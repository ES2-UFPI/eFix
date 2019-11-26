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
    padding: 10px 10px 0 10px;
    flex-direction: row;
    justify-content: space-around;
`;

export const NovoBody = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const NovoContainer = styled.View`
    background-color: #FFF;
    padding: 10px;
    elevation: 10px;
    align-items: center;
    flex-direction: column;
`;

export const InputContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const Item = styled.View`
    flex-direction: column;
    padding: 5px;
`;

export const Label = styled.Text`
    color: grey;
    font-size: 12px;
`;