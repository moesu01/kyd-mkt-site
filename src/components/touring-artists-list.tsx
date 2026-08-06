import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react"
import { touringArtists } from "../content/site-content"
import {
  BookCallCtaContent,
  bookCallButtonCss,
  Button,
} from "./ui/button"

interface LogoCrop {
  width: string
  height: string
  left: string
  top: string
}

interface TouringArtistRowProps {
  name: string
  category: string
  logoSrc?: string
  logoMaxH?: string
  logoMaxW?: string
  logoObjectFit?: "contain" | "cover"
  logoCrop?: LogoCrop
}

interface TouringCtaRowProps {
  name: string
  category: string
  href: string
}

function scalePxSize(size: string, factor: number) {
  const match = /^([\d.]+)px$/.exec(size)
  if (!match) return size
  return `${Math.round(parseFloat(match[1]) * factor)}px`
}

function TouringArtistRow({
  name,
  category,
  logoSrc,
  logoMaxH,
  logoMaxW,
  logoObjectFit = "contain",
  logoCrop,
}: TouringArtistRowProps) {
  const mobileLogoH = logoMaxH ? scalePxSize(logoMaxH, 0.75) : undefined
  const desktopLogoH = logoMaxH ? scalePxSize(logoMaxH, 0.95) : undefined
  const mobileScaledW = logoMaxW ? scalePxSize(logoMaxW, 0.75) : undefined
  const desktopScaledW = logoMaxW ? scalePxSize(logoMaxW, 0.95) : undefined
  const mobileLogoW = mobileScaledW ? `min(${mobileScaledW}, 32vw)` : undefined
  const desktopLogoW = desktopScaledW
  const hasLogo = Boolean(logoSrc && logoMaxH)
  const constrainedLogo = Boolean(logoCrop || logoObjectFit === "cover")

  return (
    <Box
      borderBottom="3px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      py="4"
    >
      <Grid
        templateColumns="minmax(0, 1fr) auto"
        alignItems="center"
        columnGap="4"
        py="2"
      >
        <Flex direction="column" align="flex-start" gap="2" minW="0">
          <Text
            as="span"
            textStyle="touringArtistName"
            minW="0"
            wordBreak="break-word"
          >
            {name}
          </Text>
          <Text as="span" textStyle="touringCategory" whiteSpace="nowrap">
            {category}
          </Text>
        </Flex>

        {hasLogo ? (
          <Box
            flexShrink={0}
            display="inline-flex"
            alignItems="center"
            justifyContent="flex-end"
            position="relative"
            h={{ base: mobileLogoH, lg901: desktopLogoH }}
            w={
              constrainedLogo
                ? { base: mobileLogoW, lg901: desktopLogoW }
                : undefined
            }
            maxW={{ base: mobileLogoW, lg901: desktopLogoW }}
            overflow={constrainedLogo ? "hidden" : undefined}
          >
            {logoCrop ? (
              <Image
                src={logoSrc}
                alt=""
                position="absolute"
                w={logoCrop.width}
                h={logoCrop.height}
                left={logoCrop.left}
                top={logoCrop.top}
                maxW="none"
                flexShrink={0}
              />
            ) : (
              <Image
                src={logoSrc}
                alt=""
                h={{ base: mobileLogoH, lg901: desktopLogoH }}
                w={
                  logoObjectFit === "cover" || logoMaxW
                    ? { base: mobileLogoW, lg901: desktopLogoW }
                    : "auto"
                }
                maxW={{ base: mobileLogoW, lg901: desktopLogoW }}
                objectFit={logoObjectFit}
                flexShrink={0}
              />
            )}
          </Box>
        ) : null}
      </Grid>
    </Box>
  )
}

function TouringCtaRow({ name, category, href }: TouringCtaRowProps) {
  return (
    <Box
      borderBottom="3px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      py={{ base: "4", lg901: "3" }}
      minH={{ base: "auto", lg901: "80px", xl1048: "100px" }}
    >
      <Flex
        display={{ base: "flex", lg901: "none" }}
        direction="column"
        align="center"
        gap="2"
        py="2"
        textAlign="center"
      >
        <Text
          as="span"
          textStyle="touringArtistName"
          minW="0"
          wordBreak="break-word"
        >
          {name}
        </Text>
        <Text as="span" textStyle="touringCategory" whiteSpace="nowrap">
          {category}
        </Text>
        <Box mt="2">
          <Button
            href={href}
            size="hero"
            css={bookCallButtonCss}
            aria-label="Book a call with KYD"
          >
            <BookCallCtaContent />
          </Button>
        </Box>
      </Flex>

      <Grid
        display={{ base: "none", lg901: "grid" }}
        templateColumns={{
          lg901: "minmax(0, 400px) 1fr 1fr",
          xl1048: "minmax(0, 500px) 1fr 1fr",
        }}
        alignItems="center"
        minH={{ lg901: "61px", xl1048: "76px" }}
      >
        <Text
          as="span"
          textStyle="touringArtistName"
          minW="0"
          wordBreak="break-word"
        >
          {name}
        </Text>

        <Flex align="center" justify="flex-end" minW="0">
          <Text as="span" textStyle="touringCategory" whiteSpace="nowrap">
            {category}
          </Text>
        </Flex>

        <Flex align="center" justify="flex-end" minW="0">
          <Button
            href={href}
            size="hero"
            css={bookCallButtonCss}
            aria-label="Book a call with KYD"
          >
            <BookCallCtaContent />
          </Button>
        </Flex>
      </Grid>
    </Box>
  )
}

export function TouringArtistsList() {
  const artistRows = touringArtists.filter(
    (artist) => !("linkLabel" in artist),
  )
  const ctaRow = touringArtists.find((artist) => "linkLabel" in artist)
  const leftColumn = artistRows.slice(0, 2)
  const rightColumn = artistRows.slice(2, 4)

  return (
    <Box aria-label="Touring artists and groups">
      <Grid
        as="ul"
        listStyleType="none"
        m="0"
        p="0"
        templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
        columnGap={{ lg901: "14" }}
        alignItems="start"
      >
        {leftColumn.map((artist, index) => (
          <Box
            as="li"
            key={artist.name}
            gridColumn={{ lg901: 1 }}
            gridRow={{ lg901: index + 1 }}
          >
            <TouringArtistRow
              name={artist.name}
              category={artist.category}
              logoSrc={"logoSrc" in artist ? artist.logoSrc : undefined}
              logoMaxH={"logoMaxH" in artist ? artist.logoMaxH : undefined}
              logoMaxW={"logoMaxW" in artist ? artist.logoMaxW : undefined}
              logoObjectFit={
                "logoObjectFit" in artist ? artist.logoObjectFit : undefined
              }
              logoCrop={"logoCrop" in artist ? artist.logoCrop : undefined}
            />
          </Box>
        ))}
        {rightColumn.map((artist, index) => (
          <Box
            as="li"
            key={artist.name}
            gridColumn={{ lg901: 2 }}
            gridRow={{ lg901: index + 1 }}
          >
            <TouringArtistRow
              name={artist.name}
              category={artist.category}
              logoSrc={"logoSrc" in artist ? artist.logoSrc : undefined}
              logoMaxH={"logoMaxH" in artist ? artist.logoMaxH : undefined}
              logoMaxW={"logoMaxW" in artist ? artist.logoMaxW : undefined}
              logoObjectFit={
                "logoObjectFit" in artist ? artist.logoObjectFit : undefined
              }
              logoCrop={"logoCrop" in artist ? artist.logoCrop : undefined}
            />
          </Box>
        ))}
      </Grid>

      {ctaRow ? (
        <TouringCtaRow
          name={ctaRow.name}
          category={ctaRow.category}
          href={ctaRow.showsHref}
        />
      ) : null}
    </Box>
  )
}
