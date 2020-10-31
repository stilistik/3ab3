import React from 'react';
import { CardStack } from './CardStack';
import { Card, CardBackground } from './Card';

import styles from './About.module.css';

interface CardData {
  title?: string;
  front: React.ReactNode;
  back?: React.ReactNode;
  style?: React.CSSProperties;
}

const data: CardData[] = [
  {
    title: 'Maeder Pänggu',
    front:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam rerum totam fuga pariatur ex non! Provident repellat praesentium laudantium asperiores dolores exercitationem, doloribus veniam, recusandae tempora, numquam repellendus? Ipsam, tenetur?',
  },
  {
    front: (
      <div>
        <h2>Fortsetzung Giorgios Pizza Teig</h2>
        <ol>
          <li>
            Mit einem Feuchten Tuch oder etwas frischhaltefolio abdecken und an
            einem warmen Ort ca. eine stunde bzw. bis er die doppelte Grösse
            erreicht hat aufgehen lassen.
          </li>
          <li>Den Teig nochmal durchkenten bis keine Luft mehr drinn ist</li>
          <li>
            12-24 Stunden im Kühlschrank aufgehen lassen 10. in ca. 250g Grosse
            Portionen aufteilen und Pizza machen
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Giorgios Pizza Teig',
    front: (
      <div>
        <h2>Zutaten</h2>
        <ul>
          <li>900g Weissmehl (im idealfall tipo 00 bzw. Pizza Mehl)</li>
          <li>100g als Reserve und zum arbeiten</li>
          <li>1Pack (7g) Trockenhefe</li>
          <li>580ml Wasser (entspricht ca. 62% des Mehl-Gewichts) </li>
          <li>20g Salz</li>
          <li>1dl Olivenöl</li>
        </ul>
      </div>
    ),
    back: (
      <div>
        <h2>Zubereitung</h2>
        <ol>
          <li>
            Als erstes nimmst du ca. 50g Mehl und 50ml Wasser und vermischst
            diese mit der Hefe in einer Schüssel, nach ca. 10 Minuten sollte die
            Mischung etwas schaumig / lusftig aussehen. Wenn nicht ist die Hefe
            tot.
          </li>
          <li>
            das restliche Mehl, in einer grossen Schüssel, mit einem
            Schwingbesen mit dem Salz vermischen
          </li>
          <li>
            das restliche Wasser und den Hefeschaum hinzufügen - Falls deine
            Hefe tot ist kannst du das gleiche wie im ersten schritt mit einem
            andere Pack probieren.
          </li>
          <li>
            Diese Mischung kannst du mit einem Stabilen Holzlöffel vermischen
            bis du das Gefühl hast, dass das ganze Mehl und Wasser vermischt
            ist.
          </li>
          <li>Den Teig aus der Schüssel nehmen und ca. 10 minuten Kneten</li>
          <li>
            Das Olivenöl in die Schüssel geben und den Teig zurück in die
            Schüssel legen und im Öl wenden bis er komplett eingeölt ist.
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: '3ab3 SECRETS',
    front: <CardBackground />,
    style: {
      display: 'flex',
      alignItems: 'center',
    },
  },
];

export const About: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <h1 className={styles.title}>Die Idee</h1>
        <p className={styles.text}>
          Der Kulturverein 3ab3 existiert seit dem Januar 2016 und ist in Räumen
          des Belvedere Bremgarten zuhause. Sämtliche Aktivitäten des Vereins
          sind selbstverwaltet und sowohl inhaltlich als auch finanziell
          unabhängig. Hauptzweck des Vereins ist die Umsetzung verrückter Ideen
          verschiedenster Art. Das Vereinslokal mit seinen Werkstätten und
          Arbeitsräumen bietet dabei die nötige Infra&shy;struktur. Die
          Mitglieder&shy;gemein&shy;schaft bietet motivierte Helfer mit viel
          Erfahrung und noch mehr Lust zum Schaffen. Vermehrt finden im Rahmen
          des Vereins auch öffentliche Ver&shy;anstaltungen statt, welche, wie
          alle Aktivitäten des Vereins, stets durch Mitglieder initiiert und
          durchgeführt werden. Die lockere aber streng demokratische Struktur
          des Vereins erlaubt jedem Mitglied, sich nach seinen Interessen und
          Möglichkeiten an den Vereins&shy;aktivitäten zu beteiligen. Die
          solidarische Zusammenarbeit der Mitglieder&shy;schaft an allen
          Projekten ermöglicht eine Aktivierung von Kompetenzen und Interessen
          verschiedenster Art, was zur Produktivität und zur Vielfalt der
          Vereins&shy;aktivitäten beiträgt.
        </p>
      </div>
      <CardStack
        cards={data.map((el) => ({
          front: (
            <Card key={el.title + 'front'} title={el.title} style={el.style}>
              {el.front}
            </Card>
          ),
          back: el.back && (
            <Card key={el.title + 'back'} style={el.style}>
              {el.back}
            </Card>
          ),
        }))}
      />
    </div>
  );
};
