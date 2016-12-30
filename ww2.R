## World War II


## Libraries

library(tidyverse)
library(lubridate)


## Data import

bombings <- read_csv("THOR_WWII_DATA_CLEAN.csv",col_types="iicccccccciicccddccccccddddcdddcdddccdddccddcccdcccccccccccccc")
bombings$MSNDATE <- mdy(bombings$MSNDATE)
glimpse(bombings)


## Total tons of explosive by country

levels(as.factor(bombings$TGT_COUNTRY))

sum_by_country <- bombings %>% group_by(TGT_COUNTRY) %>% summarise(TOTAL_TONS= sum(TOTAL_TONS, na.rm=TRUE))

sum_by_country <- sum_by_country[order(sum_by_country$TOTAL_TONS, decreasing=TRUE),]
sum_by_country$TGT_COUNTRY <- factor(sum_by_country$TGT_COUNTRY, levels = sum_by_country$TGT_COUNTRY)
sum_by_country

ggplot(top_n(sum_by_country, 10, TOTAL_TONS), aes(x=TGT_COUNTRY, y=TOTAL_TONS)) +
    geom_bar(stat="identity") +
    #scale_y_log10() + ## for a log plot
    theme(axis.text.x = element_text(angle = 50, hjust = 1))


## Total tons of explosive by month

sum_by_month <- bombings %>% select(MSNDATE, TOTAL_TONS)
sum_by_month$MONTH <- ymd(format(bombings$MSNDATE, "%Y-%m-1"))

ggplot(sum_by_month, aes(x=MONTH, y=TOTAL_TONS)) +
    stat_summary(fun.y=sum, geom="bar") +
    scale_x_date(date_labels="%Y", date_breaks="1 year", date_minor_breaks="1 month")




