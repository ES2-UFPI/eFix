import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Body = styled.View`
    flex-direction: column;
    padding: 5px;
    margin: 5px 8px;
    align-items: center;
`;

export const Title = styled.Text`
    color: #2196f3;
    font-weight: bold;
    margin: 0 0 10px 0;
    font-size: 17px;
`;

export const ButtonContainer = styled.View`
    align-items: center;
    padding: 5px 10px 0 10px;
    flex-direction: row;
    justify-content: space-around;
    width: 70%;
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
    width: 85%;
`;

export const Item = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    width: 92%;
`;

export const Label = styled.Text`
    color: grey;
    font-size: 15px;
`;

export const TimeInput = styled.View`
    width: 80px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Error = styled.Text`
    color: red;
    font-size: 14px;
`;