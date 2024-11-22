import axios, { AxiosResponse } from 'axios';

import { config } from '../../../config/config';
import { language } from '../../../utils/language';
import { PeopleEnglishType } from '../../../domain/entities/People';

class GetDataPeopleUseCase {
  async execute(): Promise<any> {
    const response: AxiosResponse<any, any> = await axios.get(`${config.swapi}/people`);

    const data: PeopleEnglishType[] = response.data.results;

    const dataTrad: object[] = data.map((objeto: PeopleEnglishType) => {
      const nuevoObjeto: object = {};

      for (const propiedad in objeto) {
        if (language.hasOwnProperty(propiedad)) {
          nuevoObjeto[language[propiedad]] = objeto[propiedad];
        } else {
          nuevoObjeto[propiedad] = objeto[propiedad];
        };
      };

      return nuevoObjeto;
    });

    return dataTrad;
  };
};

export const getDataPeopleUseCase = new GetDataPeopleUseCase(); 