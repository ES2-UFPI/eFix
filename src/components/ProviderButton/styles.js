import styled from 'styled-components/native';

export const Touchable = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-width: 1px;
    background-color: #ebf0f0;
    border-color: #ebf0f0;
    border-radius: 5px;
    elevation: 10px;
`;

export const Container = styled.View`
    flex-direction: column;
    height: 90px;
    padding: 10px;
    justify-content: center;
    elevation: 5px;
`;

export const Image = styled.Image`
    height: 70px;
    width: 70px;
    border-radius: 35px;
`;

export const Info = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Name = styled.Text`
    font-size: 16px;
`;

export const Category = styled.Text`
    margin: 0 0 0 10px;
    font-size: 15px;
    background-color: #ffff21;
    padding: 0 5px 0 5px;
    border-radius: 5px;
    elevation: 5px;
    color: #a8a8a8;
`;

export const Avaliation = styled.Text`
    font-size: 13px;
    color: grey;
`;